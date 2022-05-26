// Copyright 2018-2021 Parity Technologies (UK) Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

mod generator;
mod traits;

use self::traits::{
    GenerateCode,
    GenerateCodeUsing,
};
use proc_macro2::TokenStream as TokenStream2;

/// Types for which code can be generated by this crate.
pub trait CodeGenerator: Sized {
    /// The underlying generator generating the code.
    type Generator: From<Self> + GenerateCode;
}

impl<'a> CodeGenerator for &'a ir::Contract {
    type Generator = generator::Contract<'a>;
}

impl<'a> CodeGenerator for &'a ir::InkTrait {
    type Generator = generator::TraitDefinition<'a>;
}

impl<'a> CodeGenerator for &'a ir::InkTest {
    type Generator = generator::InkTest<'a>;
}

impl<'a> CodeGenerator for &'a ir::ChainExtension {
    type Generator = generator::ChainExtension<'a>;
}

impl<'a> CodeGenerator for &'a ir::SelectorMacro<ir::marker::SelectorId> {
    type Generator = generator::SelectorId<'a>;
}

impl<'a> CodeGenerator for &'a ir::SelectorMacro<ir::marker::SelectorBytes> {
    type Generator = generator::SelectorBytes<'a>;
}

impl<'a> CodeGenerator for &'a ir::Blake2x256Macro {
    type Generator = generator::Blake2x256<'a>;
}

/// Generates the entire code for the given ink! contract.
pub fn generate_code<T>(entity: T) -> TokenStream2
where
    T: CodeGenerator,
{
    <T as CodeGenerator>::Generator::from(entity).generate_code()
}
