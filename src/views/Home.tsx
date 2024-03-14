import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getData } from '../redux/reducers/dataReducer'
import { useTranslation } from 'react-i18next'
import Card from '../components/card/card'
import { ModalForm } from '../components/modalForm'
import CongratulationsModal from '../components/modalCongrat'

const Home = () => {
  const dispatch: AppDispatch = useDispatch()
  const { t } = useTranslation()
  const { data, fetchingData, error } = useSelector(
    (state: RootState) => state.dataReducer
  )
  const [cards, setCards] = useState<any>([])
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [mismatchesScore, setMismatchesScore] = useState<number>(0)
  const [matchesScore, setMatchesScore] = useState<number>(0)
  const [result, setResult] = useState<string>('')
  const [userName, setUserName] = useState<string | null>(null)
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false)

  useEffect(() => {
    getDataCards()
    const storedUserName = localStorage.getItem('userName')
    if (storedUserName) {
      setUserName(storedUserName)
    } else {
      openFormDialog()
    }
  }, [])

  useEffect(() => {
    const allCards = data.map((entry) => ({
      uuid: entry.meta.uuid,
      image: entry.fields.image.url,
      name: entry.meta.name,
      flipped: false,
    }))

    const duplicatedCards = [...allCards, ...allCards]
    const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
  }, [data])

  useEffect(() => {
    if (cards.length > 0 && matchesScore === cards.length / 2) {
      let scoreResult =
        matchesScore > mismatchesScore
          ? 'win'
          : matchesScore === mismatchesScore
          ? 'draw'
          : 'lose'

      setResult(scoreResult)
      setShowCongratulationsModal(true)
    }
  }, [cards, matchesScore, mismatchesScore])

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [id1, id2] = selectedCards

      if (id1 === id2) {
        setCards((prevCards: any[]) =>
          prevCards.map((card: any) =>
            selectedCards.includes(card.uuid)
              ? { ...card, flipped: true }
              : card
          )
        )
        setMatchesScore((prevScore) => prevScore + 1)

        setSelectedCards([])
      } else {
        setTimeout(() => {
          setCards((prevCards: any[]) =>
            prevCards.map((card: any) =>
              selectedCards.includes(card.uuid)
                ? { ...card, flipped: false }
                : card
            )
          )
          setSelectedCards([])
        }, 1000)

        setMismatchesScore((prevScore) => prevScore + 1)
      }
    }
  }, [selectedCards])

  const getDataCards = async () => {
    try {
      await dispatch(getData())
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleClick = (id: string, index: number) => {
    if (cards[index].flipped || selectedCards.length === 2) {
      return
    }

    setSelectedCards([...selectedCards, id])

    setCards((prevCards: any[]) =>
      prevCards.map((card: any, ind: number) =>
        ind === index ? { ...card, flipped: true } : card
      )
    )
  }

  const renderCards = () => {
    const cardsPerRow = 4
    const rows = []
    for (let i = 0; i < cards.length; i += cardsPerRow) {
      const row = cards.slice(i, i + cardsPerRow)
      rows.push(row)
    }

    return (
      <div className='container-cards'>
        {rows.map((row, rowIndex) => (
          <div className='card-row' key={`row-${rowIndex}`}>
            {row.map(
              (
                card: {
                  uuid: any
                  image: string
                  name: string
                  flipped: boolean
                },
                cardIndex: number
              ) => (
                <Card
                  key={`${card.uuid}-${cardIndex}`}
                  item={card}
                  index={rowIndex * cardsPerRow + cardIndex}
                  handleClick={handleClick}
                />
              )
            )}
          </div>
        ))}
      </div>
    )
  }

  const openFormDialog = () => {
    setUserName(null)
  }

  const handleNameUpdate = (newName: string) => {
    setUserName(newName)
    localStorage.setItem('userName', newName)
  }

  const handleClose = () => {
    setShowCongratulationsModal(false)
  }

  const handlePlayAgain = () => {
    setShowCongratulationsModal(false)
    setMatchesScore(0)
    setMismatchesScore(0)

    const shuffledCards = cards.map((card: any) => ({
      ...card,
      flipped: false,
    }))

    setCards(shuffledCards)
  }

  return (
    <>
      <div className='container'>
        {userName ? (
          <span className='container'>{`${t('WELCOME')} ${userName}!`}</span>
        ) : (
          <ModalForm onNameUpdate={handleNameUpdate} isOpen={!userName} />
        )}
      </div>

      {showCongratulationsModal && userName && (
        <CongratulationsModal
          onClose={() => setShowCongratulationsModal(false)}
          userName={userName}
          result={result}
          handleClose={handleClose}
          onPlayAgain={handlePlayAgain}
        />
      )}

      <div className='container'>
        <span>{`${t('MATCHES')} ${matchesScore} - ${t(
          'MISMATCHES'
        )} ${mismatchesScore}`}</span>
      </div>

      {renderCards()}

      {error && <div>{error}</div>}

      {fetchingData !== 'FETCHED' && <div>{`${t('LOADING')}`}</div>}
    </>
  )
}

export default Home
