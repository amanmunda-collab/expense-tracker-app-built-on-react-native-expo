import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import {SignOutButton} from "../../components/signOutButton"
import {useTransactions} from "../../hooks/useTransactions"
import { useEffect } from 'react'

export default function Page() {
  const { user } = useUser();

  console.log("userId:",user?.id);

  // use backticks if you want to use expressions inside the strings 
  // user.id will give userId of each user 
   const {isloading,summary,transactions,loadData,deleteTransaction} = useTransactions(user?.id);

  
useEffect((() => {
  loadData();
 

}

  ),[loadData]);
  if(transactions.length>0){
   console.log(transactions[0]?.title);
  }



  
 

  return (
    <View>
      <SignedIn>
        <Text>Your user id : {user?.id}</Text>
        <Text>Hell {user?.emailAddresses[0].emailAddress} Welcome </Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}