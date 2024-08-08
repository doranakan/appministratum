import {
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2
} from '@refinedev/chakra-ui'
import { Authenticated, ErrorComponent, Refine } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier
} from '@refinedev/react-router-v6'
import { dataProvider, liveProvider } from '@refinedev/supabase'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'

import { ChakraProvider, Heading, HStack, Icon, VStack } from '@chakra-ui/react'
import { ChakraUIInferencer } from '@refinedev/inferencer/chakra-ui'
import { IconBook, IconServerCog, IconSkull } from '@tabler/icons'
import authProvider from './authProvider'
import {
  CodexListPage,
  LoginPage,
  UnitCreatePage,
  UnitListPage,
  UnitTiersCreate,
  UnitTiersList
} from './pages'
import Munitorum from './pages/Munitorum'
import { supabaseClient } from './utility'

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
        <ChakraProvider theme={RefineThemes.Magenta}>
          <Refine
            authProvider={authProvider}
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            notificationProvider={notificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: 'QwIWik-v6bZYI-AdQS2F'
            }}
            resources={[
              {
                create: '/codexes/create',
                edit: '/codexes/edit/:id',
                list: '/codexes',
                name: 'codexes'
              },
              {
                create: '/units/create',
                edit: '/units/edit/:id',
                list: '/units',
                name: 'units'
              },
              {
                create: '/unit_tiers/create',
                edit: '/unit_tiers/edit/:id',
                list: '/unit_tiers',
                name: 'unit_tiers'
              }
            ]}
            routerProvider={routerBindings}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    fallback={<CatchAllNavigate to='/login' />}
                    key='loggedIn'
                  >
                    <Outlet />
                  </Authenticated>
                }
              >
                <Route
                  element={
                    <ThemedLayoutV2
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          icon={<IconSkull />}
                          text='Appministratum'
                        />
                      )}
                      Sider={({ Title }) => (
                        <ThemedSiderV2
                          Title={Title}
                          render={({ collapsed }) => (
                            <VStack alignItems='flex-start'>
                              <Link to='/'>
                                <HStack
                                  justifyContent='center'
                                  p='4'
                                >
                                  <Icon as={IconBook} />
                                  {!collapsed && (
                                    <Heading size='sm'>Codexes</Heading>
                                  )}
                                </HStack>
                              </Link>
                              <Link to='/munitorum'>
                                <HStack
                                  justifyContent='center'
                                  p='4'
                                >
                                  <Icon as={IconServerCog} />
                                  {!collapsed && (
                                    <Heading size='sm'>Munitorum</Heading>
                                  )}
                                </HStack>
                              </Link>
                            </VStack>
                          )}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource='codexes' />}
                  />
                  <Route path='codexes'>
                    <Route
                      index
                      Component={CodexListPage}
                    />
                    <Route
                      path='edit/:id'
                      Component={ChakraUIInferencer}
                    />
                    <Route
                      path='create'
                      Component={ChakraUIInferencer}
                    />
                  </Route>
                  <Route path='units'>
                    <Route
                      index
                      Component={UnitListPage}
                    />
                    <Route
                      path='edit/:id'
                      Component={ChakraUIInferencer}
                    />
                    <Route
                      path='create'
                      element={<UnitCreatePage />}
                    />
                  </Route>
                  <Route path='unit_tiers'>
                    <Route
                      index
                      Component={UnitTiersList}
                    />
                    <Route
                      path='create'
                      Component={UnitTiersCreate}
                    />
                  </Route>

                  <Route path='munitorum'>
                    <Route
                      index
                      Component={Munitorum}
                    />
                  </Route>

                  <Route
                    path='*'
                    element={<ErrorComponent />}
                  />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated
                    fallback={<Outlet />}
                    key='unregistered'
                  />
                }
              >
                <Route
                  path='/login'
                  element={<LoginPage />}
                />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
