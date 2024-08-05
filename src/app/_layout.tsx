import { Slot } from "expo-router"
import { SQLiteProvider } from "expo-sqlite"

import { initDb } from "../database/databaseInit"

export default function Layout() {
  return (
    <SQLiteProvider databaseName="notes" onInit={initDb}>
      <Slot />
    </SQLiteProvider>
  )
}