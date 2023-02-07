const PageHeader = ({ title, status }) => {
  return (
    <>
      <div className="general__screen--header">
        <div className="top">
          <h3>{title}</h3>
          <p className="general__screen--status">{status}/3</p>
        </div>
        <div className="general__screen--line" />
      </div>
    </>
  );
};

export default PageHeader;
