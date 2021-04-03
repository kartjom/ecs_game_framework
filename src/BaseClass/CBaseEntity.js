import Transform from "./../Components/Transform.js"
import Utils from "./../Utility/Utils.js"

class Entity
{
    static List = []
    static Count = 0

    static ClassList = {}

    constructor() {
        this.id = Utils.RandomID()
        this.index = Entity.Count++
        this.components = []

        this.AddComponent(new Transform())

        Entity.List[this.id] = this

        if (Entity.ClassList[this.GetClass()] == null) {
            Entity.ClassList[this.GetClass()] = []
        }
        Entity.ClassList[this.GetClass()][this.index] = this.id
    }

    GetClass() {
        return this.constructor.name
    }

    AddComponent(_component) {
        _component.owner = this
        this.components[_component.name] = _component
    }

    RemoveComponent(_componentName) {
        delete this.components[_componentName]
    }

    GetComponent(_componentName) {
        return this.components[_componentName]
    }

    Remove() {
        for (let compName in this.components) {
            delete this.components[compName]
        }
        
        delete Entity.ClassList[this.GetClass()][this.index]

        delete Entity.List[this.id]
    }
}

export default Entity