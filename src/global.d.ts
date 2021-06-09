declare global {
    import React from "react"
    module "react" {
        interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
            directory?: string
            webkitdirectory?: string
        }
    }
}