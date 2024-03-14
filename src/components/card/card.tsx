import React from 'react'

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
