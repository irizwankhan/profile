import { getTheme, Icon, Link, Stack } from '@fluentui/react';
import * as React from 'react';
import { DumbFooter, Projects, ShowCase } from '../../common';
import { IAbout, IPortfolio, IProjectDetails } from '../../model';
import { card, getDropShadow, getShadows } from '../../styles/commonStyles';
import { scrollToTop } from '../../utils';
import portfolio from '../../data/portfolio.json';
import projectDetails from '../../data/projectDetails.json';
import about from '../../data/about.json';
import main from '../../assets/img/main2.png';

export class Portfolio extends React.Component<{}> {
  portfolio: IPortfolio;
  projectDetails: IProjectDetails[];
  about: IAbout;
  constructor(props: {}) {
    super(props);
    scrollToTop();
    this.portfolio = portfolio;
    this.projectDetails = projectDetails;
    this.about = about;
  }

  render(): JSX.Element {
    const theme = getTheme();

    return (
      <>
        <Stack className="m-t-3">
          <Stack.Item align="center" className="w-100">
            <div className={`${card} card ${getShadows(theme)} profile`}>
              <div className={`image-container ${getShadows(theme)}`}>
                <img
                  className={`${getDropShadow(theme)} detailed`}
                  height="100px"
                  src={main}
                  alt="me"
                />
              </div>
              <span className="m-l-2">{this.portfolio.portfolioSubheader}</span>
            </div>
          </Stack.Item>
          <Stack.Item className="m-b-5 view-pens p-r-1">
            <Link className="p-r-1" href={this.about.codePen} target="_blank">
              {'View Pens'}
            </Link>
            <Icon iconName="OpenInNewWindow" />
          </Stack.Item>
          <h1 className="work-projects">{'Projects'}</h1>
          <Projects projectDetails={this.projectDetails} />
        </Stack>
        <ShowCase isMinVersion isShowCase />
        <DumbFooter />
      </>
    );
  }
}
