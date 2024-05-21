import React, { useEffect, useCallback, useState, useMemo } from "react"
import { useContactsActions, useContactsState } from "../store/contacts/hooks"
import styled from "styled-components";
import { Loader, WarningResolveComponent, SearchContact, Stats, UserActions } from "../components";
import { AnswerType, IAnswer, ICurrentContact, IQuestion, IQuestionnaire } from "../store/contacts";
import { CallBtn, SkipBtn, SmsBtn } from "../UI";
import { useUserActions } from "../store/user/hooks";
import NameWarningComponent from "../components/NameWarningComponent";
import { useTranslation } from "react-i18next";

const StyledNumber = styled.p`
    font-size: 25px;
    color: #F06543;
    margin-bottom: 7px;
`
const StyledQuestion = styled.p`
        font-size: 30px;
    margin:0 20px 7px;
`

const StyledName = styled.h1`
  font-weight: 700;
  font-size: 36px;
  line-height: 49px;
  text-align: center;
  margin-bottom: 10px;
`;


const StyledSkipBtn = styled(SkipBtn)`
  display: block;
  margin: 0 auto 30px;
`;


const StyledLoader = styled(Loader)`
  height: 80px;
  width: 80px;
  margin: 0 auto;
`;



const ErrorMessage = styled.p`
    margin: 70px 0 30px;
    font-weight: 700;
    text-align: center;
    font-size: 40px;
    line-height: 54px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
`;


const QuestionnaireModeView = React.memo(() => {
    const { t } = useTranslation()
    const { questionnaire, isFetching, currentContact, error } = useContactsState()
    const { onGetQuestionnaire, onAnswerQuestionnaire, onNext } = useContactsActions()
    const { onGetUserInfo } = useUserActions()
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null)
    const [answeredQuestionsIds, setAnsweredQuestionsIds] = useState<number[]>([])



    //Questions that are depended of answers
    const dependedQuestionsIds = useMemo(() => {
        const ids: any = [];
        questionnaire?.questions.forEach((q) => {
            q.answers_options.forEach((a) => {
                if (a.related_question) {
                    ids.push(a.related_question.id);
                }
            });
        });
        return ids;
    }, [questionnaire?.questions]);



    const nextQuestion = useMemo(() => {
        for (let i = 0; i < (questionnaire?.questions.length || 1); i++) {
            const question = questionnaire?.questions[i] as IQuestion
            let valid = true
            if (answeredQuestionsIds.includes(question?.id)) valid = false
            if (question?.id === currentQuestion?.id) valid = false
            if (dependedQuestionsIds.includes(question?.id)) valid = false
            if (valid) {
                return question
                break
            }
        }
    }, [questionnaire?.questions, currentQuestion, dependedQuestionsIds, answeredQuestionsIds])

    const previousQuestion = useMemo(() => {
        if (currentQuestion) {
            const index = questionnaire?.questions.indexOf(currentQuestion) || 0
            if (index > 0) return questionnaire?.questions[index - 1]
        }
    }, [currentQuestion, questionnaire?.questions])






    const handleAnswer = useCallback((answer_word: AnswerType) => {
        console.log(nextQuestion)
        const answer: IAnswer = currentQuestion?.answers_options?.find(a => a.answer_words === answer_word) as IAnswer
        onAnswerQuestionnaire((currentQuestion as IQuestion).id, answer.id, !nextQuestion)
        setAnsweredQuestionsIds((p) => ([...p, (currentQuestion as IQuestion).id]))
        if (answer.related_question) {
            setCurrentQuestion(answer.related_question)
        }
        if (!answer.related_question && nextQuestion) setCurrentQuestion(nextQuestion)
        if (!nextQuestion && !answer.related_question) {
            onGetUserInfo()
        }
    }, [nextQuestion, currentQuestion])


    useEffect(() => {
        if (!questionnaire) {
            onGetQuestionnaire()
        }
    }, [questionnaire])

    useEffect(() => {
        if (!currentContact) onNext()
    }, [currentContact])


    useEffect(() => {
        setAnsweredQuestionsIds([])
    }, [currentContact])


    const noAnswerExists = useMemo(() => {
        return !!currentQuestion?.answers_options.find(a => a.answer_words === "no")
    }, [currentQuestion?.answers_options])

    const yesAnswerExists = useMemo(() => {
        return !!currentQuestion?.answers_options.find(a => a.answer_words === "yes")
    }, [currentQuestion?.answers_options])

    const unknownAnswerExists = useMemo(() => {
        return !!currentQuestion?.answers_options.find(a => a.answer_words === "unknown")
    }, [currentQuestion?.answers_options])

    useEffect(() => {
        if (questionnaire?.questions[0]) {
            setCurrentQuestion(questionnaire?.questions[0])
        }
    }, [questionnaire?.questions, currentContact])


    if (isFetching) return <StyledLoader />
    return <>
        <Stats />
        {!!currentContact?.warning?.length && (
            <WarningResolveComponent currentContact={currentContact as ICurrentContact} />
        )}
        {currentContact?.name_warning && (
            <NameWarningComponent warningText={currentContact?.name_warning} />
        )}
        <SearchContact />
        <StyledName>{currentContact?.first_name} {currentContact?.last_name}</StyledName>
        <StyledName>{currentContact?.city}</StyledName>
        <StyledSkipBtn onClick={onNext} />
        {currentContact && <>
            {currentQuestion && <StyledNumber dir="auto">{currentQuestion.query_pos}.</StyledNumber>}
            {!questionnaire?.questions.length && <StyledNumber dir="auto">{t("questionnaire_no_questions")}</StyledNumber>}
            {currentQuestion && <StyledQuestion dir="auto" dangerouslySetInnerHTML={{ __html: currentQuestion.query }} />}
            <UserActions
                onLeft={noAnswerExists ? () => handleAnswer("no") : undefined}
                onRight={yesAnswerExists ? () => handleAnswer("yes") : undefined}
                onCenter={unknownAnswerExists ? () => handleAnswer("unknown") : undefined}
                onUp={nextQuestion ? () => setCurrentQuestion(nextQuestion) : undefined}
                onDown={previousQuestion ? () => setCurrentQuestion(previousQuestion) : undefined}
            />

        </>}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {currentContact && <BtnBox>
            <CallBtn href={`tel:${currentContact?.phone}`} />
            <SmsBtn href={`sms:${currentContact?.phone}`} />
        </BtnBox>}
    </>
})


export default QuestionnaireModeView