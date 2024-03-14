import React from 'react'
/**
 * Properties for the Card component.
 * @typedef {Object} CardProps
 * @property {Object} item - Object containing card details.
 * @property {string} item.uuid - Unique identifier for the card.
 * @property {string} item.image - URL of the card image.
 * @property {string} item.name - Name of the card.
 * @property {boolean} item.flipped - Flag indicating if the card is flipped or not.
 * @property {number} index - Index of the card.
 * @property {Function} handleClick - Function to handle click event on the card.
 */

type CardProps = {
  item: {
    uuid: string
    image: string
    name: string
    flipped: boolean
  }
  index: number
  handleClick: (id: string, index: number) => void
}

/**
 * Card component to display the data detail (image).
 * @param {CardProps} props - Props for the card component.
 * @returns {JSX.Element} Element representing the card.
 */

const Card = ({ item, index, handleClick }: CardProps) => {
  const itemClass = item.flipped ? 'active' : ''
  const cardContent = item.flipped ? (
    <img src={item.image} alt={item.name} />
  ) : (
    <span className='card-back'>?</span>
  )

  return (
    <div
      className={`card ${itemClass}`}
      onClick={() => handleClick(item.uuid, index)}
    >
      {cardContent}
    </div>
  )
}

export default Card
