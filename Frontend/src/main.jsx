import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";
import { router } from "./app.routes";

import "./index.css";

createRoot(document.getElementById("root")).render(
        <AuthProvider>
            <InterviewProvider>
                <RouterProvider router={router} />
            </InterviewProvider>
        </AuthProvider>
);
