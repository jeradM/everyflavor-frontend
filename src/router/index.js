import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import ViewRecipe from "@/views/recipes/ViewRecipe";
import BatchesView from "@/views/batch/BatchesView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/other",
    name: "other",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login")
  },
  {
    path: "/flavors",
    name: "flavors",
    component: () => import(/* webpackChunkName: "flavors" */ "@/views/Flavors")
  },
  {
    path: "/recipes",
    name: "recipes",
    component: () =>
      import(/* webpackChunkName: "recipes" */ "@/views/recipes/Recipes")
  },
  {
    path: "/recipe",
    name: "recipe",
    component: () =>
      import(/* webpackChunkName: "recipe" */ "@/views/recipes/RecipeView"),
    children: [
      {
        path: "view/:id",
        name: "viewRecipe",
        component: ViewRecipe
      },
      {
        path: "create",
        name: "createRecipe",
        component: () =>
          import(
            /* webpackChunkName: "createRecipe" */ "@/views/recipes/CreateRecipe.vue"
          )
      },
      {
        path: "edit/:id",
        name: "editRecipe",
        component: () =>
          import(
            /* webpackChunkName: "editRecipe" */ "@/views/recipes/EditRecipe.vue"
          )
      }
    ]
  },
  {
    path: "/batch",
    component: BatchesView,
    children: [
      {
        path: "view/:id",
        name: "viewBatch",
        component: () =>
          import(/* webpackChunkName: "viewRecipe" */ "@/views/batch/ViewBatch")
      },
      {
        path: "create",
        name: "createBatch",
        component: () =>
          import(
            /* webpackChunkName: "createBatch" */ "@/views/batch/CreateBatch"
          )
      }
    ]
  },
  {
    path: "/user",
    component: () =>
      import(/* webpackChunkName: "userView" */ "@/views/user/UserView"),
    children: [
      {
        path: "profile/recipes",
        name: "myRecipes",
        component: () =>
          import(/* webpackChunkName: "myRecipes" */ "@/views/user/MyRecipes")
      },
      {
        path: "profile/batches",
        name: "myBatches",
        component: () =>
          import(/* webpackChunkName: "myBatches" */ "@/views/user/MyBatches")
      },
      {
        path: "view/:id",
        name: "viewUser",
        component: () =>
          import(/* webpackChunkName: "viewUser" */ "@/views/user/ViewUser")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log("scrollBehavior");
    if (to.hash) {
      return { selector: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
