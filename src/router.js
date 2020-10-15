import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import RegisterInstitution from "./views/RegisterInstitution.vue";
import RegisterApplicant from "./views/RegisterApplicant.vue";
import RegisterObject from "./views/RegisterObject.vue";
import PreSearch from "./views/PreSearch.vue";
import Search from "./views/Search.vue";
import Return from "./views/Return.vue";
import FoundObjects from "./views/FoundObjects.vue";
import ReturnedObjects from "./views/ReturnedObjects.vue";
import SearchResultsSaved from "./views/SearchResultsSaved.vue";
import Devolution from "./views/Devolution.vue";
import Solicitations from "./views/Solicitations.vue";
import EditObject from "./views/EditObject.vue";
import RecoveredObjects from "./views/RecoveredObjects.vue";
import RequirePassword from "./views/RequirePassword.vue";
import NewPassword from "./views/NewPassword.vue";
import RegisterCategory from "./views/RegisterCategory.vue";
import SolicitedObjects from "./views/SolicitedObjects";
import EditCategory from "./views/EditCategory";
import SearchAlerts from "./views/SearchAlerts";
import Landing from "./views/Landing.vue";
import Coupon from "./views/Coupon.vue";
import Interesting from "./views/Interesting.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/landing",
      name: "landing",
      component: Landing
    },
    {
      path: "/cadastro-instituicao",
      name: "registerInstitution",
      component: RegisterInstitution
    },
    {
      path: "/editar-instituicao",
      name: "editInstitution",
      component: RegisterInstitution
    },
    {
      path: "/cadastro-requerente",
      name: "registerApplicant",
      component: RegisterApplicant
    },
    {
      path: "/editar-requerente",
      name: "editApplicant",
      component: RegisterApplicant
    },
    {
      path: "/pre-busca",
      name: "preSearch",
      component: PreSearch
    },
    {
      path: "/busca",
      name: "search",
      component: Search
    },
    {
      path: "/devolucao",
      name: "return",
      component: Return
    },
    {
      path: "/cadastro-objeto",
      name: "registerObject",
      component: RegisterObject
    },
    {
      path: "/cadastro-categoria",
      name: "registerCategory",
      component: RegisterCategory
    },
    {
      path: "/editar-categoria",
      name: "editCategory",
      component: EditCategory
    },
    {
      path: "/objetos-achados",
      name: "foundObjects",
      component: FoundObjects
    },
    {
      path: "/objetos-solicitados",
      name: "solicitedObjects",
      component: SolicitedObjects
    },
    {
      path: "/objetos-devolvidos",
      name: "returnedObjects",
      component: ReturnedObjects
    },
    {
      path: "/resultados-busca-salvos",
      name: "searchResultsSaved",
      component: SearchResultsSaved
    },
    {
      path: "/devolucao-final",
      name: "devolution",
      component: Devolution
    },
    {
      path: "/solicitacoes",
      name: "solicitations",
      component: Solicitations
    },
    {
      path: "/editar-objeto",
      name: "editObject",
      component: EditObject
    },
    {
      path: "/objetos-recuperados",
      name: "recoveredObjects",
      component: RecoveredObjects
    },
    {
      path: "/esqueci-senha",
      name: "requirePassword",
      component: RequirePassword
    },
    {
      path: "/nova-senha",
      name: "newPassword",
      component: NewPassword
    },
    {
      path: "/alertas",
      name: "searchAlerts",
      component: SearchAlerts
    },
    {
      path: "/cupons",
      name: "Coupon",
      component: Coupon
    },
    {
      path: "/objetos-interessantes",
      name: "Interesting",
      component: Interesting
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
