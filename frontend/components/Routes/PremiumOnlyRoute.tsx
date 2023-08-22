import React from "react"
import NotFoundPage from "@/app/not-found"
import { Owner } from "@/constant" // Import Owner data

type PremiumFeatures = {
  [key: string]: boolean
}

const PremiumOnlyRoute = ({
  children,
  feature,
}: {
  children: React.ReactNode
  feature: string
}) => {
  // Check if the owner has the specified premium feature
  if ((Owner.premium as PremiumFeatures)[feature]) {
    return children
  }

  return <NotFoundPage />
}

export const PremiumOnlyComponent = ({
  children,
  feature,
}: {
  children: React.ReactNode
  feature: string
}) => {
  // Check if the owner has the specified premium feature
  if ((Owner.premium as PremiumFeatures)[feature]) {
    return children
  }

  return null
}

export default PremiumOnlyRoute
