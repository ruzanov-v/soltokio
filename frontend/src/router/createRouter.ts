import { createWebHistory, createRouter as createVueRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import GameSlotsView from '@/views/games/SlotsView.vue'
import DefaultHeader from '@/components/headers/DefaultHeader.vue'
import GameHeader from '@/components/headers/GameHeader.vue'
import GameFooter from '@/components/footers/GameFooter.vue'


declare module 'vue-router' {
  interface RouteMeta {
    layout?: {
        headerTransition?: string,
        contentTransition?: string,
        footerTransition?: string,
        bgColor?: string
    }
  }
}

const routes = [
    {
        path: '/',
        components: {
            default: HomeView,
            header: DefaultHeader,
        },
        meta: {
            layout: {
                bgColor: '#FFA013',
            }
        }
    },
    {
        path: '/games',
        children: [
            {
                path: 'slots',
                components: {
                    default: GameSlotsView,
                    header: GameHeader,
                    footer: GameFooter,
                },
                props: {
                    header: {
                        gameName: 'jjj',
                    }
                },
                meta: {
                    layout: {
                        bgColor: '#DAF3A6',
                    },
                },
            },
            {
                path: 'lotto',
                components: {
                    default: GameSlotsView,
                    header: GameHeader,
                    footer: GameFooter,
                },
                props: {
                    header: {
                        gameName: 'jjj',
                    }
                },
                meta: {
                    layout: {
                        bgColor: '#A5DFF7',
                    },
                },
            },
        ],   
    },
]

export const createRouter = () => {
    const router = createVueRouter({
        history: createWebHistory(),
        routes,
    })

    return router
}
