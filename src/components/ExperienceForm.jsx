import "./styles/ExperienceForm.css";

const ExperienceForm = () => {
  return (
    <div className="experience__form--container">
      <div className="postion--employer">
        <div className="position">
          <h3>თანამდებობა</h3>
          <input type="text" placeholder="დეველოპერი, დიზაინერი, ა.შ." />
          <p>მინიმუმ 2 სიმბოლო</p>
        </div>
        <div className="employer">
          <h3>დამსაქმებელი</h3>
          <input type="text" placeholder="დამსაქმებელი" />
          <p>მინიმუმ 2 სიმბოლო</p>
        </div>
      </div>
      <div className="start__due--date">
        <div className="start__date">
          <h3>დაწყების რიცხვი</h3>
          <input type="date" />
        </div>
        <div className="due__date">
          <h3>დამთავრების რიცხვი</h3>
          <input type="date" />
        </div>
      </div>
      <div className="desc">
        <div>
          <h3>აღწერა</h3>
          <input type="text" placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"/>
        </div>
      </div>
      <div className="devider--line"></div>
      <button type="button" className="add__more">მეტი გამოცდილების დამატება</button>
    </div>
  );
};

export default ExperienceForm;
