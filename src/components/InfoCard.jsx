const InfoCard = ({ info_1, info_2, info_3, info_4, info_5 }) => {
  return (
    <>
      <div className="experience__container">
        <div className="pos__date">
          <h3>{`${info_1}${info_1 && ","}  ${info_2}`}</h3>
          {info_3 && <h2>{`${info_3}${info_3 && " -"} ${info_4}`}</h2>}
          {!info_3 && <h2>{`${info_4}`}</h2>}
        </div>
        <p>{info_5}</p>
      </div>
    </>
  );
};

export default InfoCard;
