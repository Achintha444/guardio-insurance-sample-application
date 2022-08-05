import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Settings from './[settings]';
import config from '../../config.json';
import { redirect, getOrg, getOrgIdfromRouterQuery } from '../../util/util';
import { getSession } from 'next-auth/react';
import { getCookie, setCookie } from 'cookies-next';
import cookie from "cookie";


export async function getServerSideProps(context) {

  const session = await getSession(context);

  if (!session) {
    return redirect('/signin');
  }


  // //sessionStorage
  // const routerQuery = context.query.id;
  // // useEffect(() => {
  // //   setValue(sessionStorage.setItem("routerQuery", "asdasd"))
  // // }, [])
  // if (typeof window !== 'undefined') {
  //   return redirect('/signin');
  //   sessionStorage.setItem("routerQuery", "asdasd");
  // }

  const routerQuery = context.query.id;
  const currentOrgId = context.query.orgId;
  let setOrg = {};

  let orgId = getOrgIdfromRouterQuery(routerQuery);

  if(orgId==undefined){
    return redirect('/404');
  }

  setOrg = getOrg(orgId);

  // // const cookies = res.cookies;
  // const currentOrgId = getCookie('orgId');
  // const routerQuery = context.query.id;

  // let setOrg = {};

  // if (currentOrgId == undefined) {
  //   const orgId = context.query.orgId;

  //   setOrg = getOrg(orgId);

  //   if (setOrg == undefined) {
  //     return redirect('/404')
  //   }

  //   setCookie('orgId', orgId,{});

  //   // context.res.setHeader("Set-Cookie",
  //   //   cookie.serialize("orgId", orgId, {
  //   //     httpOnly: true,
  //   //     path: "/",
  //   //     sameSite: "strict"
  //   //   }))
  // }

  // else {
  //   if (getRouterQuery(currentOrgId) != routerQuery) {
  //     //return redirect('/404')
  //   }
  // }

  return {
    props: { session, setOrg },
  }

}
export default function Org(props) {

  return (
    <Settings orgId={props.setOrg.id} routerQuery={props.setOrg.routerQuery} name={props.setOrg.name} colorTheme={props.setOrg.colorTheme} />
  )
}
