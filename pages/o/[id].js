import { useRouter } from 'next/router';
import React from 'react'
import Settings from './[settings]';
import config from '../../config.json';
import { redirect } from '../../util/util';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {

  console.log(context);
  //const router = useRouter();

  const session = await getSession(context);
  const orgId =  context.query.id ;
  console.log(context.query)
  let setOrg = {};

  if (!session) {
    return redirect('/signin');
  }

  if (orgId == config.SAMPLE_ORGS[0].routerQuery) {
    setOrg = config.SAMPLE_ORGS[0];
  } else if (orgId == config.SAMPLE_ORGS[1].routerQuery) {
    setOrg = config.SAMPLE_ORGS[1];
  } else {
    return redirect('/404')
  }

  // if (setVar==1) {
  //     return redirect(`/o/${config.SAMPLE_ORGS[0].routerQuery}`);
  // } else {
  //     return redirect(`/o/${config.SAMPLE_ORGS[1].routerQuery}`);
  // }

  return {
    props: { session, setOrg },
  }
}


export default function Org(props) {

  return (
    <Settings orgid={props.setOrg.id} routerQuery={props.setOrg.routerQuery} name={props.setOrg.name}
      colorTheme={props.setOrg.colorTheme} />
  )
}
