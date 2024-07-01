import { getTheme, ITheme } from '@fluentui/react';
import * as React from 'react';
import { card, getImageFilter, getShadows } from '../../styles/commonStyles';
import './index.scss';
import codePen from '../../assets/img/codepen.webp';
import { IAbout } from '../../model';
import about from '../../data/about.json';

export class CodePenIcon extends React.Component {
  about: IAbout;
  constructor(props: {}) {
    super(props);
    this.about = about;
  }

  render(): JSX.Element {
    const theme: ITheme = getTheme();

    return (
      <div
        className={`${card} card ${getShadows(
          theme
        )} icon-container codepen-icon a-d4`}
      >
        <img
          className={`icon ${getImageFilter(theme)}`}
          height="100px"
          src={codePen}
          alt="codepen"
          onClick={() => {
            window.open(`${this.about.codePen}`, '_blank');
          }}
        />
      </div>
    );
  }
}
