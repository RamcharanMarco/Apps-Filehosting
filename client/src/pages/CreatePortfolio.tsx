import '../styles/createportfolio.scss'
import { useState } from "react";
import { useCreatePortfolio } from "../hooks/useCreatePortfolio";

const CreatePortfolio = () => {
  const {createPortfolio} =useCreatePortfolio();

  const [photo, setPhoto] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [age, setAge] = useState<string>("")
  const [about, setAbout] = useState<string>("")

  


  const handleClick = (e: any) => {
    e.preventDefault();
    createPortfolio(
      photo,
      name,
      surname,
      age,
      about
    );
  };

  return (
    <div className="createportfolio">
      <div className='con'>
      </div>
      <h1>ADD PORTFOLIO</h1>
      <div className="photoupload">
        <h1>add picture</h1>
        <form>
          <input
            id="photoinput"
            name="photo"
            onChange={(e: any) => setPhoto(e.target.files[0])}
            type="file"
          />
        </form>
      </div>
      <div className="description">
        <h1>name</h1>
        <textarea
          onChange={(e: any) => setName(e.target.value)}
          value={name}
        ></textarea>
      </div>
      <div className="about">
        <h1>about</h1>
        <textarea
          onChange={(e: any) => setAbout(e.target.value)}
          value={about}
        ></textarea>
      </div>
      <div>
        <h1>surname</h1>
        <form>
          <input
            type="text"
            onChange={(e: any) => setSurname(e.target.value)}
            value={name}
            placeholder="name"
          />
          <input
            type="text"
            placeholder="url"
            value={age}
            onChange={(e: any) => setAge(e.target.value)}
          />
        </form>
      </div>
      <button onClick={handleClick}>create portolio</button>
    </div>
  );
};

export default CreatePortfolio;
