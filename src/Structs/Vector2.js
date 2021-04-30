class Vector2
{
    constructor(_x = 0, _y = 0) {
        this.x = _x
        this.y = _y

        return this
    }

    static Copy(_other) {
        return new Vector2(_other.x, _other.y)
    }

    Add(_other) {
        let value = Vector2.Copy(this)

        value.x += _other.x
        value.y += _other.y

        return value
    }

    Mul(_num) {
        let value = Vector2.Copy(this)

        value.x *= _num
        value.y *= _num

        return value
    }
    
    Div(_num) {
        let value = Vector2.Copy(this)

        value.x /= _num
        value.y /= _num

        return value
    }

    AngleRad(p2)
    {
        let p1 = Vector2.Copy(this)
        let angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        return angleRadians
    }
    
    AngleDeg(p2)
    {
        let p1 = Vector2.Copy(this)
        let angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

        return angleDeg
    }

    RadToVector(radian)
    {
        let x = Math.cos(radian)
        let y = Math.sin(radian)

        return new Vector2(x, y)    
    }

    AimVector(vec2)
    {
        let aimAngle = this.AngleRad(vec2)
        let aimVector = this.RadToVector(aimAngle)

        return aimVector
    }

    Magnitude()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}

export default Vector2