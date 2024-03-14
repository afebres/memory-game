import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getData } from '../redux/reducers/dataReducer'
import { useTranslation } from 'react-i18next'
import Card from '../components/card/card'
import { ModalForm } from '../components/modalForm'
import { ResultModal } from '../components/modalCongrat'

/**
 * Properties for the Home component.
 * @typedef {Object} HomeProps
 */

/**
 * Home component to manage the game.
 * @returns {JSX.Element} Element representing the home page.
 */

const Home = (): JSX.Element => {
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
  const [showResultModal, setShowResultModal] = useState(false)

  useEffect(() => {
    getDataCards()
    const storedUserName = localStorage.getItem('userName')
    if (storedUserName) {
      setUserName(storedUserName)
    } else {
      openFormModal()
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
      setShowResultModal(true)
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

  /**
   * Function to get the data.
   */
  const getDataCards = async () => {
    try {
      await dispatch(getData())
    } catch (error) {
      console.error('Error:', error)
    }
  }

  /**
   * Function to handle clicks on cards.
   */
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

  /**
   * Function to render cards.
   */
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

  /**
   * Function to handle opening the user name input modal.
   */
  const openFormModal = () => {
    setUserName(null)
  }

  /**
   * Function to handle updating the user name.
   * @param {string} newName - The new user name.
   */
  const handleNameUpdate = (newName: string) => {
    setUserName(newName)
    localStorage.setItem('userName', newName)
  }

  /**
   * Function to handle closing the game result modal.
   */
  const handleClose = () => {
    setShowResultModal(false)
  }

  /**
   * Function to play the game again.
   */
  const handlePlayAgain = () => {
    setShowResultModal(false)
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

      {showResultModal && userName && (
        <ResultModal
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
