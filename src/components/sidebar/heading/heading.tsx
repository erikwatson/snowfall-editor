import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import './heading.css';

type HeadingProps = {
  advanced: boolean;
}

export const Heading = ({advanced}: HeadingProps) => {
  return (
    <div className="heading">
      <h1>Snowfall :: stay cool ☃️</h1>
      <p>An <a href="https://erikwatson.me">Erik Watson</a> project</p>
      <ul>
        <li><a href='https://github.com/erikwatson/snowfall.js'><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon></a></li>
        <li><a href='https://www.npmjs.com/package/@erikwatson/snowfall'><FontAwesomeIcon icon={faNpm}></FontAwesomeIcon></a></li>
      </ul>
    </div>
  );
}