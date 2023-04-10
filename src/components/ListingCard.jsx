import React from "react";

const ListingCard = ({ data }) => {
  return (
    <article className="card">
      <div className="card__background">
        <div className="card__arrow card__arrow--1"></div>
        <div className="card__arrow card__arrow--2"></div>
        <div className="card__arrow card__arrow--3"></div>
      </div>
      <div className="card__content">
        <div className="card__header">
          <h3 className="card__position">{data.position}.</h3>
          <div className="card__points">
            <p>{data.points}</p>
            <p>PTS</p>
          </div>
        </div>
        <div className="card__main">
          <h4 className="card__name">{data.name}</h4>
          <div className="card__flag">
            <img src={data.flag} alt={`${data.country} flag`} />
          </div>
        </div>
        {data.team && (
          <div className="card__team">
            <p>{data.team}</p>
          </div>
        )}

        {data.team && (
          <div className="card__graphic">
            <div className="card__number">{data.number}</div>
            <div className="card__image">
              <img src={data.image} alt={`${data.name}`} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default ListingCard;
