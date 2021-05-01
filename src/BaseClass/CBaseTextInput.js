import Clickable from "./CBaseClickable.js"

import Canvas from "../RenderSystem/Canvas.js"
import Vector2 from "../Structs/Vector2.js"
import Input from "../Input/InputManager.js"

class TextInput extends Clickable
{
    constructor(_pos = new Vector2(), _placeholder = "Input") {
        super(_pos)

        this.Text = "",
        this.Style = {
            TextColor: "black",
            Placeholder: _placeholder,
            PlaceholderColor: "gray",
            FontSize: 20,
            Border: true,
            BorderColor: "black",
            Background: false,
            BackgroundColor: "black",
            Cursor: "text",
            BBox: false,
        }

        this.SetWidth(250)
        this.SetHeight(this.Style.FontSize * 2)
    }

    GetValue() {
        return this.Text
    }

    SetValue(_value) {
        this.Text = _value
    }

    Update() {
        if (this.Active) {
            const input = Input.GetPressed()
            
            if (input.length == 1) {
                this.Text += Input.GetKey("shift") ? input.toUpperCase() : input             
            }

            if (input == "backspace") {
                this.Text = this.Text.substr(0, this.Text.length - 1)
            }
        }

        this.Draw()
        this.DrawBBox()
    }

    Draw() {
        const canvas = Canvas.GetByName("debug")

        if (this.Style.Background) {
            let borderStart = this.BBoxStart
            canvas.DrawRect(borderStart, new Vector2(this.Style.Width, this.Style.Height), {color: this.Style.BackgroundColor, fill: true})
        }

        const textPos = new Vector2(this.Position.x - this.Style.Width/2 + 5, this.Position.y + (this.Style.FontSize * 0.33))
        let textValue = this.Text == "" && !this.Active ? this.Style.Placeholder : this.Text
        let textColor = this.Text == "" ? this.Style.PlaceholderColor : this.Style.TextColor

        if (this.Active) {
            textValue += "|"
        }
        
        canvas.DrawText(textValue, textPos, {color: textColor, fontSize: this.Style.FontSize, align: "left"})
        
        if (this.Style.Border) {
            let borderStart = this.BBoxStart
            canvas.DrawRect(borderStart, new Vector2(this.Style.Width, this.Style.Height), {color: this.Style.BorderColor, fill: false})
        }
    }

    OnMouseOver() {
        
    }

    OnMouseOut() {
        
    }
}

export default TextInput