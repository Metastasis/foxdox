import React from 'react';
import MaterialLink, { LinkProps as MLinkProps } from '@mui/material/Link';
import Link, { LinkProps } from 'next/link';

type Props = MLinkProps & {
  href: LinkProps['href']
}

export default function LinkWrapped(props: Props) {
  return (
    <Link href={props.href} passHref>
      <LinkAdapter>
        {props.children}
      </LinkAdapter>
    </Link>
  );
}

function LinkAdapter(props: any) {
  return (
    <MaterialLink
      target="_blank"
      href={props.href}
      rel="noopener noreferrer"
    >
      {props.children}
    </MaterialLink>
  );
}
