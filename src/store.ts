import { combineReducers, configureStore } from '@reduxjs/toolkit'
import configReducer from './features/config/config.slice'
import editorSettingsReducer from './features/editor-settings/editor-settings.slice'

export const store = configureStore({
  reducer: combineReducers({
    userConfig: configReducer,
    editorSettings: editorSettingsReducer,
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch