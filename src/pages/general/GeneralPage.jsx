import "./style/styles.css";
import Resume from "../../components/Resume";
import arrowIcon from "../../assets/images/Vector.png";

const GeneralPage = () => {
  return (
    <div className="general__screen">
      <div className="arrow__icon">
        <img src={arrowIcon} alt="arrow" />
      </div>
      <div className="general__screen--left">
        <div className="general__screen--header">
          <div className="top">
            <h3>პირადი ინფო</h3>
            <p className="general__screen--status">1/3</p>
          </div>
          <div className="general__screen--line" />
        </div>
        <form>
          <div className="general__screen--inputs">
            <div className="first__two--inputs">
              <div className="first--input">
                <h3>სახელი</h3>
                <input type="text" name="name" placeholder="ანზორ" />
                <p>მინიმუმ 2 ასო, ქართული ასოები</p>
              </div>
              <div className="second--input">
                <h3>გვარი</h3>
                <input type="text" name="surname" placeholder="მუმლაძე" />
                <p>მინიმუმ 2 ასო, ქართული ასოები</p>
              </div>
            </div>
          </div>
          <div className="last--inputs">
            <div className="image__upload">
              <h3>პირადი ფოტოს ატვირთვა</h3>
              <button>ატვირთვა</button>
            </div>
            <div className="about__me">
              <h3>ჩემ შესახებ (არასავალდებულო)</h3>
              <input type="text" placeholder="ზოგადი ინფო შენ შესახებ" />
            </div>
            <div className="email--input">
              <h3>ელ.ფოსტა</h3>
              <input
                type="text"
                name="name"
                placeholder="anzorr666@redberry.ge"
              />
              <p>უნდა მთავრდებოდეს @redberry.ge-ით</p>
            </div>
            <div className="phone--input">
              <h3>მობილურის ნომერი</h3>
              <input type="text" name="name" placeholder="+995 551 12 34 56" />
              <p>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</p>
            </div>
            <button className="next--btn">შემდეგი</button>
          </div>
        </form>
      </div>
      <Resume />
    </div>
  );
};

export default GeneralPage;
