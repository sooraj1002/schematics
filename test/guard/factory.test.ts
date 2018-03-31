import { VirtualTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { expect } from 'chai';
import * as path from 'path';
import { GuardOptions } from '../../src/guard/schema';
import { ApplicationOptions } from '../../src/application/schema';
import { ExceptionOptions } from '../../src/exception/schema';

describe('Guard Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner('.', path.join(process.cwd(), 'src/collection.json'));
  it('should manage name only', () => {
    const options: GuardOptions = {
      name: 'foo'
    };
    const tree: UnitTestTree = runner.runSchematic('guard', options, new VirtualTree());
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/src/foo/foo.guard.ts`
      )
    ).to.not.be.undefined;
  });
  it('should manage name as a path', () => {
    const options: GuardOptions = {
      name: 'bar/foo'
    };
    const tree: UnitTestTree = runner.runSchematic('guard', options, new VirtualTree());
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/src/bar/foo/foo.guard.ts`
      )
    ).to.not.be.undefined;
  });
  it('should manage name and path', () => {
    const options: GuardOptions = {
      name: 'foo',
      path: 'baz'
    };
    const tree: UnitTestTree = runner.runSchematic('guard', options, new VirtualTree());
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/src/baz/foo/foo.guard.ts`
      )
    ).to.not.be.undefined;
  });
});
