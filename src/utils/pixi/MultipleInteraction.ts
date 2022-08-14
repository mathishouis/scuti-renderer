import {InteractionManager, InteractionTrackingData} from '@pixi/interaction';
import {DisplayObject, InteractionCallback, InteractionEvent, Graphics, Sprite, Point, Container} from 'pixi.js';

export class TreeSearch
{
    private readonly _tempPoint: Point;

    constructor()
    {
        console.log("cccc1");
        this._tempPoint = new Point();
    }

    /**
     * Recursive implementation for findHit
     *
     * @private
     * @param {PIXI.InteractionEvent} interactionEvent - event containing the point that
     *  is tested for collision
     * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - the displayObject
     *  that will be hit test (recursively crawls its children)
     * @param {Function} [func] - the function that will be called on each interactive object. The
     *  interactionEvent, displayObject and hit will be passed to the function
     * @param {boolean} [hitTest] - this indicates if the objects inside should be hit test against the point
     * @param {boolean} [interactive] - Whether the displayObject is interactive
     * @return {boolean} returns true if the displayObject hit the point
     */
    public recursiveFindHit(interactionEvent: InteractionEvent, displayObject: DisplayObject,
                            func?: InteractionCallback, hitTest?: boolean, interactive?: boolean
    ): boolean
    {
        console.log("cccc");
        if(!displayObject.visible)
        {
            return false;
        }

        const point = interactionEvent.data.global;

        var children = displayObject.children;

        var hit = false;

        // if the object is interactive we must hit test all its children..
        interactive = interactive || displayObject.interactive;

        if(displayObject.interactiveChildren)
        {

            for (var i = children.length-1; i >= 0; i--)
            {
                if(! hit  && hitTest)
                {
                    hit = this.recursiveFindHit(interactionEvent, children[i], func, true, interactive );
                }
                else
                {
                    // now we know we can miss it all!
                    this.recursiveFindHit(interactionEvent, children[i], func, true, false );
                }
            }

        }

        if(interactive)
        {
            if(hitTest)
            {
                if(displayObject.hitArea)
                {
                    // lets use the hit object first!
                    displayObject.worldTransform.applyInverse(point,  this._tempPoint);
                    hit = displayObject.hitArea.contains( this._tempPoint.x, this._tempPoint.y );
                }
                else if(displayObject.containsPoint)
                {
                    hit = displayObject.containsPoint(point);
                }
            }

            if(displayObject.interactive)
            {
                func(interactionEvent, displayObject, hit);
            }
        }

        return hit;
    }

    /**
     * This function is provides a neat way of crawling through the scene graph and running a
     * specified function on all interactive objects it finds. It will also take care of hit
     * testing the interactive objects and passes the hit across in the function.
     *
     * @private
     * @param {PIXI.InteractionEvent} interactionEvent - event containing the point that
     *  is tested for collision
     * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - the displayObject
     *  that will be hit test (recursively crawls its children)
     * @param {Function} [func] - the function that will be called on each interactive object. The
     *  interactionEvent, displayObject and hit will be passed to the function
     * @param {boolean} [hitTest] - this indicates if the objects inside should be hit test against the point
     * @return {boolean} returns true if the displayObject hit the point
     */
    public findHit(interactionEvent: InteractionEvent, displayObject: DisplayObject,
                   func?: InteractionCallback, hitTest?: boolean
    ): void
    {
        console.log("flop");
        this.recursiveFindHit(interactionEvent, displayObject, func, hitTest, false);
    }
}
