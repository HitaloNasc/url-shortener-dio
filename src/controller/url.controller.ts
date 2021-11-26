// global
import { Request, Response } from "express";
import shortid from "shortid";
// local
import { config } from "../config/constants";
import { URLModel } from "../model/url.model";

export class URLController {
  /***
   *   @description This method must be:
   *   - See if the URL already exists
   *   - Create a hash for URL
   *   - Save URL to database
   *   - Return the saved URL
   ***/
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;

    const url = await URLModel.findOne({ originURL });
    if (url) {
      res.json(url);
      return;
    }

    const hash = shortid.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    const newURL = await URLModel.create({ hash, shortURL, originURL });
    res.json(newURL);
  }
  /***
   *   @description This method must be:
   *   - get the url hash
   *   - find original url by hash
   *   - redirect to the original URL saved in the database
   ***/
  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;

    const url = await URLModel.findOne({ hash });
    if (url) {
      res.redirect(url.originURL);
      return;
    }

    res.status(400).json({ error: "URL note found" });
  }
}
