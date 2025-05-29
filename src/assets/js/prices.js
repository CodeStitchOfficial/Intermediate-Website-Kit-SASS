class CS_MenuFilter {
    filtersSelector = '.cs-button'
    menuSelector = '.cs-menu-group'
    activeClass = 'cs-active'
    hiddenClass = 'cs-hidden'

    constructor() {
        this.$menus = document.querySelectorAll(this.menuSelector)
        const $filters = document.querySelectorAll(this.filtersSelector)

        this.onClick($filters[0])

        for (const $filter of $filters) {
            $filter.addEventListener('click', () => this.onClick($filter))
        }
    }

    onClick($filter) {
        this.filter($filter.dataset.filter)

        const { activeClass } = this

        this.$activeFilter?.classList.remove(activeClass)
        $filter.classList.add(activeClass)

        this.$activeFilter = $filter
    }

    filter(filter) {
        const showAll = filter == 'all'
        const { hiddenClass } = this

        for (const $menu of this.$menus) {
            const show = showAll || $menu.dataset.category == filter
            $menu.classList.toggle(hiddenClass, !show)
        }
    }
}

new CS_MenuFilter()