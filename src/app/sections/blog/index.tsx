// import { getTheme } from '@fluentui/react';
import * as React from 'react';
import Masonry from 'react-masonry-css';
import {
  ButtonCard,
  CodePenIcon,
  DumbFooter,
  GithubIcon,
  LinkedInIcon,
  MailForm,
  ShowCase,
} from '../../common';
// import { card, getShadows } from '../../styles/commonStyles';
import { scrollToTop } from '../../utils';

interface IBlogProps {
  onThemeChange: () => void;
}

export class Blog extends React.Component<IBlogProps> {
  constructor(props: IBlogProps) {
    super(props);
    scrollToTop();
  }
  breakpointColumnsObjSmall = {
    default: 4,
    767: 1,
  };
  render(): JSX.Element {
    // const theme = getTheme();

    return (
      <>
        <Masonry
          breakpointCols={this.breakpointColumnsObjSmall}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <CodePenIcon />
          <LinkedInIcon />
          <GithubIcon />
          <ButtonCard onThemeChange={this.props.onThemeChange} />
        </Masonry>
        {/* <div
          className={`${card} card ${getShadows(
            theme
          )} p-1 contribution-grid-con`}
        >
          <img
            className="contribution-grid"
            width="100%"
            src={
              'https://ssr-contributions-svg.vercel.app/_/rizz-wan?format=svg&&widget_size=small&chart=calendar&weeks=40'
            }
            alt="github contribution"
          />
        </div> */}
        <ShowCase isMinVersion isShowCase />
        <DumbFooter />
        <br />
        <MailForm isOnLastTab />
      </>
    );
  }
}
