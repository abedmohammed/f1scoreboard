import React from "react";

const ListingCard = ({ data }) => {
  return (
    <article className={`card ${data.team || "card--teams"}`}>
      <div
        className={`card__background ${
          data.team ? "" : "card__background--right"
        }`}
      >
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
          {data.team ? (
            <div className="card__flag">
              {data.flag && (
                <img src={data.flag} alt={`${data.country} flag`} />
              )}
            </div>
          ) : (
            <div className="card__logo">
              <img src={data.logo} alt={`${data.name} logo`} />
            </div>
          )}
        </div>
        {data.team ? (
          <div className="card__team">
            <p>{data.team}</p>
          </div>
        ) : (
          <div className="card__drivers">
            <div className="card__driver">
              <div className="card__driver-image">
                <img src={data.drivers[0].image} alt="" />
              </div>
              <p>{data.drivers[0].name}</p>
            </div>
            <div className="card__driver">
              <div className="card__driver-image">
                <img src={data.drivers[1].image} alt="" />
              </div>
              <p>{data.drivers[1].name}</p>
            </div>
          </div>
        )}

        {data.team ? (
          <div className="card__graphic">
            <div className="card__number">{data.number}</div>
            <div className="card__image">
              <img src={data.image} alt={`${data.name}`} />
            </div>
          </div>
        ) : (
          <div className="card__car">
            <img src={data.car} alt={`Car of ${data.name}`} />
          </div>
        )}
      </div>
    </article>
  );
};

export default ListingCard;
