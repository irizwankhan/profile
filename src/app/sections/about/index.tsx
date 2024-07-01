import * as React from 'react';
import Masonry from 'react-masonry-css';
import {
  ButtonCard,
  CodePenIcon,
  DumbFooter,
  GithubIcon,
  Job,
  LinkedInIcon,
  ProfileCard,
} from '../../common';
import { IAbout } from '../../model';
import about from '../../data/about.json';
import { scrollToTop } from '../../utils';
import { Stack } from '@fluentui/react';

interface IAboutProps {
  onThemeChange: () => void;
}

export class About extends React.Component<IAboutProps> {
  about: IAbout;
  constructor(props: IAboutProps) {
    super(props);
    scrollToTop();
    this.about = about;
  }
  breakpointColumnsObjSmall = {
    default: 4,
    767: 1,
  };

  render(): JSX.Element {
    return (
      <Stack className="m-t-3">
        <ProfileCard hideFooter />
        <Masonry
          breakpointCols={this.breakpointColumnsObjSmall}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <LinkedInIcon />
          <CodePenIcon />
          <GithubIcon />
          <ButtonCard onThemeChange={this.props.onThemeChange} />
        </Masonry>
        <Job isDetailedView />
        <DumbFooter />
      </Stack>
    );
  }
}
