import { Container } from "@arkecosystem/core-cli";
import { Console } from "@arkecosystem/core-test-framework";
import { white } from "kleur";

import { Info } from "@packages/core-cli/src/components";

let cli;
let component;

beforeEach(() => {
    cli = new Console();

    // Bind from src instead of dist to collect coverage.
    cli.app
        .rebind(Container.Identifiers.Info)
        .to(Info)
        .inSingletonScope();
    component = cli.app.get(Container.Identifiers.Info);
});

describe("Info", () => {
    it("should render the component", () => {
        const spyLogger = jest.spyOn(cli.app.get(Container.Identifiers.Logger), "info");

        component.render("Hello World");

        expect(spyLogger).toHaveBeenCalledWith(white().bgBlue(`[INFO] Hello World`));
    });
});
