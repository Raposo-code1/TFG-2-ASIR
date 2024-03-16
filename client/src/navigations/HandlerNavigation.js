import React from "react";
import { AppNavigation } from "./AppNavigation";
import { AuthNavigation } from "./stacks";




export function HandlerNavigation() {
    const user = { name: "Agustin" };

    return user ? <AppNavigation /> : <AuthNavigation />
}