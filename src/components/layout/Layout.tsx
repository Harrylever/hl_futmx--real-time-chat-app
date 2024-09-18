import React from 'react'
import { useAppSelector } from 'src/app'
import { LoadingPlayer } from 'src/components/ui'
import { Toaster } from '@/components/ui/toaster'
import { useIndexQuery } from 'src/app/api/hooks'
import { Outlet, useLocation } from 'react-router-dom'
import { useGetScreenSize } from 'src/components/hooks'
import { ChangeViewComponent } from 'src/components/molecules'
import { NavBarComponent, SideBarChatList } from 'src/components/features'

export default function Layout() {
  const user = useAppSelector((state) => state.userReduce)
  const sideBarChatListIsOpen = useAppSelector(
    (state) => state.appUIStateReduce.sideBarChatOpen,
  )

  const location = useLocation()

  const { data, error, isFetching } = useIndexQuery()
  const { screenWidth } = useGetScreenSize()

  return (
    <React.Fragment>
      {isFetching && <LoadingPlayer />}

      {!error && data && (
        <div className="w-full">
          <div className="w-full relative">
            {screenWidth < 1024 && user && sideBarChatListIsOpen && (
              <SideBarChatList />
            )}

            <div className="relative z-[20] w-full bg-mx-white shadow-md">
              <NavBarComponent />
            </div>

            {user && location.pathname === '/app' ? (
              <div className="relative h-[88vh] w-full sm:overflow-hidden z-[10] flex flex-row items-start justify-start">
                <div className="hidden lg:block max-w-[210px] h-full">
                  <ChangeViewComponent />
                </div>

                <Outlet />
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Outlet />
              </div>
            )}
          </div>
        </div>
      )}
      <Toaster />
    </React.Fragment>
  )
}
