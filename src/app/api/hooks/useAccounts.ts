import { useQuery } from '@tanstack/react-query'
import {
  getAccounts,
  getActiveAccount,
  getRecipientAccount,
} from '../actions/accounts'
import { AxiosError } from 'axios'
import { IUser, IGetRecipientAccountValues, QueryBaseResponse } from 'typings'

export function useGetActiveUserQuery() {
  return useQuery<QueryBaseResponse<IUser>, AxiosError>({
    queryKey: ['active-user'],
    queryFn: getActiveAccount,
  })
}

export function useGetRecipientUserQuery(values: IGetRecipientAccountValues) {
  return useQuery<QueryBaseResponse<IUser>, AxiosError>({
    queryKey: ['recipient-user'],
    queryFn: () => getRecipientAccount(values),
  })
}

export function useGetAllUsersQuery() {
  return useQuery<QueryBaseResponse<IUser[]>, AxiosError>({
    queryKey: ['all-user-accounts'],
    queryFn: getAccounts,
  })
}
