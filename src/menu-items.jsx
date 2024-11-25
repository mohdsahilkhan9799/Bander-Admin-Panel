

const menuItems = {

  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/adminpanel/dashboard'
        }
      ]
    },



    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: 'feather icon-lock',
          children: [
            {
              id: 'signup-1',
              title: 'Register / Role',
              type: 'item',
              url: '/auth/signup-1',
              target: true,
              breadcrumbs: false
            },
            // {
            //   id: 'signin-1',
            //   title: 'Sign in',
            //   type: 'item',
            //   url: '/auth/signin-1',
            //   target: true,
            //   breadcrumbs: false
            // }
          ]
        },
        // {
        //   id: 'product/category',
        //   title: 'Create Category',
        //   type: 'item',
        //   url: '/product/category',
        //   classes: 'nav-item',
        //   icon: 'feather icon-sidebar'
        // },
        {
          id: 'create/Product',
          title: 'Create Product',
          type: 'item',
          url: '/create/Product',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'All/Product',
          title: 'All Product List',
          type: 'item',
          url: '/All/Product',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        // {
        //   id: '/coupans',
        //   title: 'Create Coupans',
        //   type: 'item',
        //   url: '/coupans',
        //   classes: 'nav-item',
        //   icon: 'feather icon-sidebar'
        // },


      ]
    },
    {
      id: 'pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'profile',
          title: 'Profile',
          type: 'collapse',
          icon: 'feather icon-user', 

          children: [
            {
              id: 'ProfilePage',
              title: 'Profile Page',
              type: 'item',
              url: '/ProfilePage',
              classes: 'nav-item',
              icon: 'feather icon-sidebar'
            },
            {
              id: 'alletPage',
              title: 'Wallet',
              type: 'item',
              url: '/walletPage',
              classes: 'nav-item',
              icon: 'feather icon-sidebar'
            },

          ]
        },
      ]
    }
  ]
};

export default menuItems;
