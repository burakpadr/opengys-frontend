<template>
    <slot name="content"></slot>
</template>

<script>
import { parseToken, removeToken } from "@/service/TokenService";

export default {
    name: "ViewUsedByTenant",
    mounted() {
        let decodedJwt = parseToken();

        if (!decodedJwt.isTenant) {
            removeToken();

            window.location.href = "/";
        }
    }
}
</script>