import { gysClient } from "@/assets/js/client";

export async function canSeeComponent(componentName) {
    return await gysClient.get(`role-ui-elements/can-see-component?componentName=${componentName}`);
}