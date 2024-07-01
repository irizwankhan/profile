import * as React from 'react';
import { getTheme } from '@fluentui/react';
import {
  ButtonCard,
  Job,
  MailForm,
  ProfileCard,
  ShowCase,
  LinkedInIcon,
  GithubIcon,
  DumbFooter,
  CodePenIcon,
} from '../../common';
import { card, getShadows } from '../../styles/commonStyles';
import { scrollToTop } from '../../utils';

interface IAllProps {
  onThemeChange: () => void;
  onTabChange: (currentTab: string) => void;
}

export class All extends React.Component<IAllProps> {
  constructor(props: IAllProps) {
    super(props);
    scrollToTop();
  }
  public componentDidMount(): void {
    const skillCloud = document.getElementsByClassName('skill-cloud')[0];
    setTimeout(() => {
      skillCloud.classList.add('f-90');
    }, 3200);
  }

  render(): JSX.Element {
    const theme = getTheme();
    return (
      <>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6 p-l-0 lg-p-r-0">
              <ProfileCard onTabChange={this.props.onTabChange} />
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6 p-l-0">
                <Job onTabChange={this.props.onTabChange} />
                <CodePenIcon />
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6 p-r-0">
                <ButtonCard onThemeChange={this.props.onThemeChange} />
                <div
                  className={`${card} card ${getShadows(
                    theme,
                    true
                  )} bg-white skill-cloud animation-none`}
                ></div>
              </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6 p-r-0 lg-p-l-0">
              <ShowCase onTabChange={this.props.onTabChange} />
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6 p-l-0">
                <LinkedInIcon />
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6 p-r-0">
                <GithubIcon />
              </div>
            </div>
          </div>
        </div>
        <DumbFooter />
        <br />
        <MailForm />
      </>
    );
  }
}
