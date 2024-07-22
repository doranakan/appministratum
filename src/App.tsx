import {
  RefineThemes,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  Title,
  notificationProvider
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
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import { ChakraProvider, Heading, HStack, Image } from '@chakra-ui/react'
import authProvider from './authProvider'
import {
  CodexListPage,
  LoginPage,
  ModelCreate,
  ModelList,
  UnitCompositionCreate,
  UnitCompositionList,
  UnitCreatePage,
  UnitListPage,
  UnitOptionCreate,
  UnitOptionList,
  UnitTiersCreate,
  UnitTiersList,
  UnitWargearCreate,
  UnitWargearList,
  WeaponCreate,
  WeaponList
} from './pages'
import { supabaseClient } from './utility'

import { ChakraUIInferencer } from '@refinedev/inferencer/chakra-ui'

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
        <ChakraProvider theme={RefineThemes.Magenta}>
          <Refine
            Title={({ collapsed }) =>
              collapsed ? (
                <Image
                  src='src/assets/logo.png'
                  width={10}
                  height={10}
                />
              ) : (
                <HStack>
                  <Image
                    src='src/assets/logo.png'
                    width={10}
                    height={10}
                  />
                  <Heading size='xs'>Appministratum</Heading>
                </HStack>
              )
            }
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
              },
              {
                create: '/unit_compositions/create',
                edit: '/unit_compositions/edit/:id',
                list: '/unit_compositions',
                name: 'unit_compositions'
              },
              {
                create: '/models/create',
                edit: '/models/edit/:id',
                list: '/models',
                name: 'models'
              },
              {
                create: '/weapons/create',
                edit: '/weapons/edit/:id',
                list: '/weapons',
                name: 'weapons'
              },
              {
                create: '/unit_wargears/create',
                edit: '/unit_wargears/edit/:id',
                list: '/unit_wargears',
                name: 'unit_wargears'
              },
              {
                create: '/unit_options/create',
                edit: '/unit_options/edit/:id',
                list: '/unit_options',
                name: 'unit_options'
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
                      Sider={() => <ThemedSiderV2 render={() => <></>} />}
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
                  <Route path='weapons'>
                    <Route
                      index
                      Component={WeaponList}
                    />
                    <Route
                      path='create'
                      Component={WeaponCreate}
                    />
                  </Route>
                  <Route
                    path='*'
                    element={<ErrorComponent />}
                  />
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
                  <Route path='unit_compositions'>
                    <Route
                      index
                      Component={UnitCompositionList}
                    />
                    <Route
                      path='create'
                      Component={UnitCompositionCreate}
                    />
                  </Route>
                  <Route path='unit_wargears'>
                    <Route
                      index
                      Component={UnitWargearList}
                    />
                    <Route
                      path='edit/:id'
                      Component={ChakraUIInferencer}
                    />
                    <Route
                      path='create'
                      Component={UnitWargearCreate}
                    />
                  </Route>
                  <Route path='unit_options'>
                    <Route
                      index
                      Component={UnitOptionList}
                    />
                    <Route
                      path='edit/:id'
                      Component={ChakraUIInferencer}
                    />
                    <Route
                      path='create'
                      Component={UnitOptionCreate}
                    />
                  </Route>
                  <Route path='models'>
                    <Route
                      index
                      Component={ModelList}
                    />
                    <Route
                      path='create'
                      Component={ModelCreate}
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
