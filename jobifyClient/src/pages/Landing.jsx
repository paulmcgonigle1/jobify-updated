import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo></Logo>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span>
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem quam
            commodi, ipsam provident hic impedit. Cumque culpa accusamus,
            officiis corporis dolor nihil sapiente tenetur error doloribus sunt?
            Eos, deleniti illo?
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn register-link">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

// const Wrapper = styled.div`
//   background: red;
//   h1 {
//     color: white;
//   }
//   .content {
//     background: blue;
//     color: yellow;
//   }
// `;
export default Landing;
