import { forwardRef } from 'react';

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

// eslint-disable-next-line react/display-name
export const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...restProps } = props;
  return <RouterLink ref={ref} to={href} {...restProps} />;
});
