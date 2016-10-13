import React from 'react'
import { ArrayComponent } from 'simple-react-form'
if(Meteor.isClient){
    Ons = require('react-onsenui');
}

export default class ArrayField extends ArrayComponent {

    constructor(props) {
        super(props);
    }

    renderChildrenItem({ index, children }) {
        return (
            <div className={this.props.childrenClassName} key={`${this.props.fieldName}.${index}`}>
                <div className="col-sm-11">
                    {this.renderChildrenItemWithContext({index, children})}
                </div>
                <div className="col-sm-1 text-right">
                    {this.renderRemoveButton(index)}
                </div>
            </div>
        )
    }

    renderRemoveButton(index) {
        if (this.props.disabled) return
        return (
            <Ons.Button modifier="outline" onClick={() => this.removeItem(index)}>
                <Ons.Icon icon="md-minus" />
            </Ons.Button>
        )
    }

    renderAddButton() {
        if (!this.props.showAddButton) return
        if (this.props.disabled) return
        return (
            <Ons.Button modifier="outline" onClick={() => this.addItem()}>
                <Ons.Icon icon="md-plus" />
            </Ons.Button>
        )
    }

    render() {
        return (
            <div>
                <div className={this.props.parentClassName}>
                    {this.renderChildren()}
                </div>
                <div>
                    {this.renderAddButton()}
                </div>
            </div>
        )
    }
}

ArrayField.propTypes = {
    ...ArrayComponent.propTypes,
    parentClassName: React.PropTypes.string,
    childrenClassName: React.PropTypes.string,
    addButtonIcon: React.PropTypes.string,
    removeButtonIcon: React.PropTypes.string
}

ArrayField.defaultProps = {
    ...ArrayComponent.defaultProps,
    parentClassName: '',
    childrenClassName: 'row',
    addButtonIcon: 'md-plus',
    removeButtonIcon: 'md-minus'
}