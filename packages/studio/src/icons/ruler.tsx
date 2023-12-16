import React from 'react';
import classnames from 'classnames';
import { useIconClassName } from './util';
import type { IconProps } from './util';

const Pen = (props: IconProps) => {
  const { className, style } = props;
  const { iconClassName } = useIconClassName();

  return (
    <span className={classnames([iconClassName, className])} style={style}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M929.19 352.19c3.12 3.12 3.12 8.19 0 11.31L363.51 929.19c-3.12 3.12-8.19 3.12-11.31 0L94.81 671.81c-3.12-3.12-3.12-8.19 0-11.31L660.49 94.81c3.12-3.12 8.19-3.12 11.31 0l257.39 257.38z m-424.26 5.66l108.89 108.89c3.12 3.12 3.12 8.19 0 11.31l-36.77 36.77c-3.12 3.12-8.19 3.12-11.31 0L456.85 405.93l-50.91 50.91 62.23 62.23c3.12 3.12 3.12 8.19 0 11.31l-36.77 36.77c-3.12 3.12-8.19 3.12-11.31 0l-62.23-62.23-50.91 50.91 62.23 62.23c3.12 3.12 3.12 8.19 0 11.31l-36.77 36.77c-3.12 3.12-8.19 3.12-11.31 0l-62.23-62.23-62.23 62.23 161.22 161.22 469.52-469.52-161.23-161.21-62.23 62.23 62.23 62.23c3.12 3.12 3.12 8.19 0 11.31l-36.77 36.77c-3.12 3.12-8.19 3.12-11.31 0l-62.23-62.23-50.91 50.91z"></path>
      </svg>
    </span>
  );
};

export default Pen;
