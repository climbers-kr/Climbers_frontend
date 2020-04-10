import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import '../../test.css';

// list of items
const list = [
    { name: 'item1' },
    { name: 'item2' },
    { name: 'item3' },
    { name: 'item4' },
    { name: 'item5' },
    { name: 'item6' },
    { name: 'item7' },
    { name: 'item8' },
    { name: 'item9' }
];

// One item component
// selected prop will be passed
const MenuItem = ({text, selected}) => {
    return <div
        className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
    list.map(el => {
        const {name} = el;

        return <MenuItem text={name} key={name} selected={selected} />;
    });


const Arrow = ({ text, className }) => {
    return (
        <div
            className={className}
        >{text}</div>
    );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 'item1';

export default class HorizontalScroll extends Component {
    constructor(props) {
        super(props);
        // call it again if items count changes
        this.menuItems = Menu(list, selected);
    }

    state = {
        alignCenter: true,
        clickWhenDrag: false,
        dragging: true,
        hideArrows: true,
        hideSingleArrow: true,
        itemsCount: list.length,
        scrollToSelected: false,
        selected: "item1",
        translate: 0,
        transition: 0.3,
        wheel: true
    };

    onSelect = key => {
        this.setState({ selected: key });
    }


    render() {
        const { selected, alignCenter,hideArrows,hideSingleArrow  } = this.state;
        // Create menu from items
        const menu = this.menuItems;

        return (
            <div className="App">
                <ScrollMenu
                    alignCenter={alignCenter}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}

                    data={menu}

                    hideArrows={hideArrows}
                    hideSingleArrow={hideSingleArrow}
                    onFirstItemVisible={this.onFirstItemVisible}
                    onLastItemVisible={this.onLastItemVisible}
                    onSelect={this.onSelect}
                    onUpdate={this.onUpdate}


                    selected={selected}

                />
            </div>
        );
    }
}